package Domain.ProgramState;

import Exceptions.ADTException;
import Domain.Utilities.IDictionary;
import Domain.Utilities.IList;
import Domain.Utilities.IStack;

import Domain.Value.IValue;
import Domain.Statement.IStmt;

import java.io.BufferedReader;
import java.util.List;

public class ProgramState {
	IStack<IStmt> exeStack;
	IDictionary<String, IValue> symTable;
	IList<IValue> out;
	IDictionary<String, BufferedReader> fileTable;
	IStmt originalProgram;

	public ProgramState(IStack<IStmt> exeStack, IDictionary<String, IValue> symTable, IList<IValue> out, IDictionary<String, BufferedReader> fileTable, IStmt originalProgram) {
		this.exeStack = exeStack;
		this.symTable = symTable;
		this.out = out;
		this.fileTable = fileTable;
		this.originalProgram = originalProgram;
		this.exeStack.push(this.originalProgram);
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

	public String toString() {
		return "Execution stack: \n" + exeStack + "\nSymbol table: \n" + symTable.toString() + "\nOutput list: \n" + out.toString();
	}

	public String programStateToString() throws ADTException {
		return "Execution stack: \n" + exeStackToString() + "Symbol table: \n" + symTableToString() + "Output list: \n" + outToString() + "File table:\n" + fileTableToString() + "\n";
	}
}