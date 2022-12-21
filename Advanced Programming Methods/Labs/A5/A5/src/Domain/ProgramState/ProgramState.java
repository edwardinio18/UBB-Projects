package Domain.ProgramState;

import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Exceptions.ADTException;
import Domain.Utilities.*;

import Domain.Value.IValue;
import Domain.Statement.IStmt;

import java.io.BufferedReader;
import java.util.List;

// Class that represents the state of the program at a given moment
public class ProgramState {
	IStack<IStmt> exeStack;
	IDictionary<String, IValue> symTable;
	IList<IValue> out;
	IDictionary<String, BufferedReader> fileTable;
	IStmt originalProgram;
	private IHeap heap;
	private int id;
	private static int lastId = 0;

	public ProgramState(IStack<IStmt> exeStack, IDictionary<String, IValue> symTable, IList<IValue> out, IDictionary<String, BufferedReader> fileTable, IHeap heap, IStmt originalProgram) {
		this.exeStack = exeStack;
		this.symTable = symTable;
		this.out = out;
		this.fileTable = fileTable;
		this.heap = heap;
		this.originalProgram = originalProgram;
		this.exeStack.push(this.originalProgram);
		this.id = setId();
	}

	public ProgramState(IStack<IStmt> exeStack, IDictionary<String, IValue> symTable, IList<IValue> out, IDictionary<String, BufferedReader> fileTable, IHeap heap) {
		this.exeStack = exeStack;
		this.symTable = symTable;
		this.out = out;
		this.fileTable = fileTable;
		this.heap = heap;
		this.id = setId();
	}

	public synchronized int setId() {
		lastId++;
		return lastId;
	}

	public boolean isNotCompleted() {
		return exeStack.isEmpty();
	}

	public IStack<IStmt> getExeStack() {
		return exeStack;
	}

	public void setExeStack(IStack<IStmt> exeStack) {
		this.exeStack = exeStack;
	}

	public IDictionary<String, IValue> getSymTable() {
		return symTable;
	}

	public void setSymTable(IDictionary<String, IValue> symTable) {
		this.symTable = symTable;
	}

	public IList<IValue> getOut() {
		return out;
	}

	public void setOut(IList<IValue> out) {
		this.out = out;
	}

	public IDictionary<String, BufferedReader> getFileTable() {
		return fileTable;
	}

	public void setFileTable(IDictionary<String, BufferedReader> fileTable) {
		this.fileTable = fileTable;
	}

	public IHeap getHeap() {
		return heap;
	}

	public void setHeap(IHeap heap) {
		this.heap = heap;
	}

	public ProgramState oneStep() throws StatementException, ExpressionException, ADTException {
		if (!exeStack.isEmpty()) {
			IStmt currentStatement = exeStack.pop();
			return currentStatement.execute(this);
		}

		return null;
	}

	public String exeStackToString() {
		StringBuilder exeStackStringBuilder = new StringBuilder();
		List<IStmt> stack = exeStack.getReversed();

		for (IStmt statement : stack)
			exeStackStringBuilder.append(statement.toString()).append("\n");

		return exeStackStringBuilder.toString();
	}

	public String symTableToString() throws ADTException {
		StringBuilder symTableStringBuilder = new StringBuilder();

		for (String key : symTable.keySet())
			symTableStringBuilder.append(String.format("%s -> %s\n", key, symTable.lookUp(key).toString()));

		return symTableStringBuilder.toString();
	}

	public String outToString() {
		StringBuilder outStringBuilder = new StringBuilder();

		for (IValue elem : out.getList())
			outStringBuilder.append(String.format("%s\n", elem.toString()));

		return outStringBuilder.toString();
	}

	public String fileTableToString() {
		StringBuilder fileTableStringBuilder = new StringBuilder();

		for (String key : fileTable.keySet())
			fileTableStringBuilder.append(String.format("%s\n", key));

		return fileTableStringBuilder.toString();
	}

	public String heapToString() throws ADTException {
		StringBuilder heapStringBuilder = new StringBuilder();
		for (int key : heap.keySet())
			heapStringBuilder.append(String.format("%d -> %s\n", key, heap.get(key)));

		return heapStringBuilder.toString();
	}

	@Override
	public String toString() {
		return "ID: \n" + id + "\nExecution stack: \n" + exeStack.getReversed() + "\nSymbol table: \n" + symTable.toString() + "\nOutput list: \n" + out.toString() + "\nFile table:\n" + fileTable.toString() + "\nHeap memory:\n" + heap.toString() + "\n";
	}

	public String programStateToString() throws ADTException {
		return "ID: \n" + id + "\nExecution stack: \n" + exeStackToString() + "Symbol table: \n" + symTableToString() + "Output list: \n" + outToString() + "File table:\n" + fileTableToString() + "Heap memory:\n" + heapToString();
	}
}