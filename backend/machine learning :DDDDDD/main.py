# core_rag.py
from langchain_community.document_loaders import WebBaseLoader, DirectoryLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import OllamaEmbeddings  # or HuggingFaceEmbeddings
from langchain_community.vectorstores import DuckDB
from langchain_community.llms import Ollama
from langchain.chains import RetrievalQA
import duckdb

class ACRepairPricingAgent:
    def __init__(self):
        self.embeddings = OllamaEmbeddings(model="nomic-embed-text")
        self.llm = Ollama(model="llama3")  # or ChatOpenAI if preferred
        self.vectorstore = None

    def load_knowledge(self, data_path):
        """Load AC repair manuals, price guides, etc."""
        loader = DirectoryLoader(data_path, glob="**/*.pdf")
        docs = loader.load()
        
        # Split documents into chunks
        splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        texts = splitter.split_documents(docs)
        
        # Store in DuckDB (no FAISS/PyTorch needed)
        self.vectorstore = DuckDB.from_documents(
            documents=texts,
            embedding=self.embeddings,
            connection=duckdb.connect(":memory:")
        )
    
    def query(self, question):
        """Get pricing estimate with sources"""
        if not self.vectorstore:
            raise ValueError("Load knowledge base first!")
            
        qa_chain = RetrievalQA.from_chain_type(
            llm=self.llm,
            chain_type="stuff",
            retriever=self.vectorstore.as_retriever(search_kwargs={"k": 3}),
            return_source_documents=True
        )
        
        result = qa_chain.invoke({"query": question})
        return {
            "answer": result["result"],
            "sources": [doc.metadata["source"] for doc in result["source_documents"]
        }

# Price estimation wrapper (domain-specific logic)
def estimate_repair_cost(agent, problem_description, unit_type, location):
    prompt = f"""
    Estimate repair cost for:
    Problem: {problem_description}
    Unit Type: {unit_type}
    Location: {location}
    
    Consider parts, labor rates, and typical time required.
    Return price range (Low/Medium/High) and approximate USD range.
    """
    return agent.query(prompt)