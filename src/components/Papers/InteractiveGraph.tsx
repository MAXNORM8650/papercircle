import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Search, ZoomIn, ZoomOut, Maximize2, Filter } from 'lucide-react';

interface Node {
  id: string;
  type: string;
  title?: string;
  name?: string;
  description?: string;
  [key: string]: any;
}

interface Edge {
  source: string;
  target: string;
  relationship?: string;
  [key: string]: any;
}

interface InteractiveGraphProps {
  nodes: Record<string, Node>;
  edges: Record<string, Edge>;
}

export function InteractiveGraph({ nodes, edges }: InteractiveGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [nodeTypes, setNodeTypes] = useState<string[]>([]);

  useEffect(() => {
    if (!svgRef.current || !nodes || !edges) return;

    // Convert nodes and edges to arrays
    const nodesArray = Object.entries(nodes).map(([id, node]) => ({
      id,
      ...node,
    }));

    const edgesArray = Object.values(edges).map(edge => ({
      ...edge,
      source: edge.source,
      target: edge.target,
    }));

    // Get unique node types
    const types = [...new Set(nodesArray.map(n => n.type))];
    setNodeTypes(types);

    // Filter nodes and edges based on search and filter
    let filteredNodes = nodesArray;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredNodes = filteredNodes.filter(
        n =>
          (n.title?.toLowerCase().includes(query)) ||
          (n.name?.toLowerCase().includes(query)) ||
          (n.id.toLowerCase().includes(query))
      );
    }
    if (filterType !== 'all') {
      filteredNodes = filteredNodes.filter(n => n.type === filterType);
    }

    const filteredNodeIds = new Set(filteredNodes.map(n => n.id));
    const filteredEdges = edgesArray.filter(
      e => filteredNodeIds.has(e.source) && filteredNodeIds.has(e.target)
    );

    // Clear previous graph
    d3.select(svgRef.current).selectAll('*').remove();

    // Setup SVG
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height]);

    // Add zoom behavior
    const g = svg.append('g');

    const zoom = d3.zoom()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom as any);

    // Color scale for node types
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Create force simulation
    const simulation = d3.forceSimulation(filteredNodes as any)
      .force('link', d3.forceLink(filteredEdges)
        .id((d: any) => d.id)
        .distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(30));

    // Draw edges
    const link = g.append('g')
      .selectAll('line')
      .data(filteredEdges)
      .join('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2);

    // Draw edge labels
    const edgeLabels = g.append('g')
      .selectAll('text')
      .data(filteredEdges)
      .join('text')
      .attr('font-size', 10)
      .attr('fill', '#666')
      .attr('text-anchor', 'middle')
      .text((d: any) => d.relationship || '');

    // Draw nodes
    const node = g.append('g')
      .selectAll('circle')
      .data(filteredNodes)
      .join('circle')
      .attr('r', 8)
      .attr('fill', (d: any) => color(d.type))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .call(drag(simulation) as any);

    // Add node labels
    const labels = g.append('g')
      .selectAll('text')
      .data(filteredNodes)
      .join('text')
      .text((d: any) => d.title || d.name || d.id)
      .attr('font-size', 12)
      .attr('dx', 12)
      .attr('dy', 4)
      .style('pointer-events', 'none');

    // Node interactions
    node.on('mouseover', function(event, d: any) {
      d3.select(this)
        .attr('r', 12)
        .attr('stroke-width', 3);
    })
    .on('mouseout', function() {
      d3.select(this)
        .attr('r', 8)
        .attr('stroke-width', 2);
    })
    .on('click', (event, d: any) => {
      event.stopPropagation();
      setSelectedNode(d);
    });

    // Update positions on tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      edgeLabels
        .attr('x', (d: any) => (d.source.x + d.target.x) / 2)
        .attr('y', (d: any) => (d.source.y + d.target.y) / 2);

      node
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);

      labels
        .attr('x', (d: any) => d.x)
        .attr('y', (d: any) => d.y);
    });

    // Drag behavior
    function drag(simulation: any) {
      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [nodes, edges, searchQuery, filterType]);

  const handleZoomIn = () => {
    const svg = d3.select(svgRef.current);
    svg.transition().call(d3.zoom().scaleBy as any, 1.5);
  };

  const handleZoomOut = () => {
    const svg = d3.select(svgRef.current);
    svg.transition().call(d3.zoom().scaleBy as any, 0.67);
  };

  const handleReset = () => {
    const svg = d3.select(svgRef.current);
    svg.transition().call(d3.zoom().transform as any, d3.zoomIdentity);
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search nodes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter by type */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-600" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              {nodeTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomIn}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              title="Zoom In"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              title="Zoom Out"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <button
              onClick={handleReset}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              title="Reset View"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Graph and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Graph Canvas */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div ref={containerRef} className="w-full">
            <svg ref={svgRef} className="w-full" />
          </div>
          <div className="p-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
            <div className="flex items-center justify-between">
              <span>
                Showing {Object.keys(nodes).length} nodes, {Object.keys(edges).length} edges
              </span>
              <span className="text-xs">
                💡 Drag nodes • Scroll to zoom • Click nodes for details
              </span>
            </div>
          </div>
        </div>

        {/* Node Details Panel */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Node Details</h3>
          {selectedNode ? (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Type</label>
                <p className="text-sm font-medium text-blue-600 capitalize">{selectedNode.type}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Title</label>
                <p className="text-sm font-medium text-gray-900">
                  {selectedNode.title || selectedNode.name || selectedNode.id}
                </p>
              </div>
              {selectedNode.description && (
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Description</label>
                  <p className="text-sm text-gray-700">{selectedNode.description}</p>
                </div>
              )}
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">ID</label>
                <p className="text-xs font-mono text-gray-600">{selectedNode.id}</p>
              </div>
              {selectedNode.origin_pages && selectedNode.origin_pages.length > 0 && (
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Pages</label>
                  <p className="text-sm text-gray-700">{selectedNode.origin_pages.join(', ')}</p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">Click a node to view details</p>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Legend</h3>
        <div className="flex flex-wrap gap-3">
          {nodeTypes.map((type, idx) => (
            <div key={type} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full border-2 border-white"
                style={{ backgroundColor: d3.schemeCategory10[idx % 10] }}
              />
              <span className="text-sm text-gray-700 capitalize">{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
