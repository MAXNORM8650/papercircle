from smolagents import CodeAgent, ToolCallingAgent, DuckDuckGoSearchTool, VisitWebpageTool, LiteLLMModel, tool

MODEL_ID = "ollama_chat/gpt-oss:20b"  
API_BASE = "http://10.127.30.115:11434"

model = LiteLLMModel(
    model_id=MODEL_ID, 
    api_base=API_BASE,
    num_ctx=8192
)

managed_web_agent = ToolCallingAgent(
    tools=[DuckDuckGoSearchTool(), VisitWebpageTool()],
    model=model,
    name="search_agent",
    description="Runs web searches for you. Give it your query as an argument.",
)

answer = managed_web_agent.run("what the name of the first paper in world model")