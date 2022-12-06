package Domain.ProgramState;

import Exceptions.ADTException;
import Domain.Statement.IStmt;
import Domain.Utilities.IDictionary;
import Domain.Utilities.IHeap;
import Domain.Utilities.IList;
import Domain.Utilities.IStack;
import Domain.Value.IValue;

import java.io.BufferedReader;
import java.util.List;

public class ProgramState {
	private IStack<IStmt> exeStack;
	private IDictionary<String, IValue> symTable;
	private IList<IValue> out;
	private IDictionary<String, BufferedReader> fileTable;
	private IHeap heap;
	private IStmt originalProgram;

	public ProgramState(IStack<IStmt> stack, IDictionary<String, IValue> symTable, IList<IValue> out, IDictionary<String, BufferedReader> fileTable, IHeap heap, IStmt program) {
		this.exeStack = stack;
		this.symTable = symTable;
		this.out = out;
		this.fileTable = fileTable;
		this.heap = heap;
		this.originalProgram = program;
		this.exeStack.push(this.originalProgram);
	}

	public void setExeStack(IStack<IStmt> newStack) {
		this.exeStack = newStack;
	}

	public void setSymTable(IDictionary<String, IValue> newSymTable) {
		this.symTable = newSymTable;
	}

	public void setOut(IList<IValue> newOut) {
		this.out = newOut;
	}

	public void setFileTable(IDictionary<String, BufferedReader> newFileTable) {
		this.fileTable = newFileTable;
	}

	public void setHeap(IHeap newHeap) {
		this.heap = newHeap;
	}

	public IStack<IStmt> getExeStack() {
		return exeStack;
	}

	public IDictionary<String, IValue> getSymTable() {
		return symTable;
	}

	public IList<IValue> getOut() {
		return out;
	}

	public IDictionary<String, BufferedReader> getFileTable() {
		return fileTable;
	}

	public IHeap getHeap() {
		return heap;
	}

	public String exeStackToString() {
		StringBuilder exeStackStringBuilder = new StringBuilder();
		List<IStmt> stack = exeStack.getReversed();
		for (IStmt statement : stack) {
			exeStackStringBuilder.append(statement.toString()).append("\n");
		}
		return exeStackStringBuilder.toString();
	}

	public String symTableToString() throws ADTException {
		StringBuilder symTableStringBuilder = new StringBuilder();
		for (String key : symTable.keySet()) {
			symTableStringBuilder.append(String.format("%s -> %s\n", key, symTable.lookUp(key).toString()));
		}
		return symTableStringBuilder.toString();
	}

	public String outToString() {
		StringBuilder outStringBuilder = new StringBuilder();
		for (IValue elem : out.getList()) {
			outStringBuilder.append(String.format("%s\n", elem.toString()));
		}
		return outStringBuilder.toString();
	}

	public String fileTableToString() {
		StringBuilder fileTableStringBuilder = new StringBuilder();
		for (String key : fileTable.keySet()) {
			fileTableStringBuilder.append(String.format("%s\n", key));
		}
		return fileTableStringBuilder.toString();
	}

	public String heapToString() throws ADTException {
		StringBuilder heapStringBuilder = new StringBuilder();
		for (int key : heap.keySet()) {
			heapStringBuilder.append(String.format("%d -> %s\n", key, heap.get(key)));
		}
		return heapStringBuilder.toString();
	}

	@Override
	public String toString() {
		return "Execution stack: \n" + exeStack.getReversed() + "\nSymbol table: \n" + symTable.toString() + "\nOutput list: \n" + out.toString() + "\nFile table:\n" + fileTable.toString() + "\nHeap memory:\n" + heap.toString() + "\n";
	}

	public String programStateToString() throws ADTException {
		return "Execution stack: \n" + exeStackToString() + "Symbol table: \n" + symTableToString() + "Output list: \n" + outToString() + "File table:\n" + fileTableToString() + "Heap memory:\n" + heapToString();
	}
}