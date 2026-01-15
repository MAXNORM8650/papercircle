from supabase import create_client                                
import os                      
from dotenv import load_dotenv 

load_dotenv()                  

url = os.getenv('VITE_SUPABASE_URL')                              
key = os.getenv('SUPABASE_SERVICE_ROLE_KEY') or os.getenv('VITE_SUPABASE_ANON_KEY')                                                    

client = create_client(url, key)                                  

# Test the FTS search          
result = client.rpc('search_papers_fts', {                        
    'search_query': 'transformer attention',                      
    'p_limit': 5               
}).execute()                   

print(f'FTS Search returned {len(result.data)} papers:')          
for p in result.data[:3]:
    print(p)
#    print(f'  - {p.get(\"title\", \"Unknown\")[:70]}...'))