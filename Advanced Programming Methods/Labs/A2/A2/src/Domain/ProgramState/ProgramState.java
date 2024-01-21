package Domain.ProgramState;

import Domain.Utilities.IDictionary;
import Domain.Utilities.IList;
import Domain.Utilities.IStack;
import Domain.Statement.IStmt;
import Domain.Value.IValue;

public class ProgramState {
	private IStack<IStmt> exeStack;
	private IDictionary<String, IValue> symTable;
	private IList<IValue> out;
	private IStmt firstProgram;

	public ProgramState(IStack<IStmt> exeStack, IDictionary<String, IValue> symTable, IList<IValue> out, IStmt firstProgram) {
		this.exeStack = exeStack;
		this.symTable = symTable;
		this.out = out;
		this.firstProgram = firstProgram;
		this.exeStack.push(firstProgram);
	}
	public IStack<IStmt> getExeStack() {
		return this.exeStack;
	}

	public void setExeStack(IStack<IStmt> exeStack) {
		this.exeStack = exeStack;
	}

	public IDictionary<String, IValue> getSymTable() {
		return this.symTable;
	}

	public void setSymTbl(IDictionary<String, IValue> symTable) {
		this.symTable = symTable;
	}

	public IList<IValue> getOut() {
		return this.out;
	}

	public void setOut(IList<IValue> out) {
		this.out = out;
	}

	public IStmt getFirstProgram() {
		return this.firstProgram;
	}

	public void setFirstProgram(IStmt firstProgram) {
		this.firstProgram = firstProgram;
	}

	public String exeStackToString(){
		return this.exeStack.toString();
	}

	public String symTableToString(){
		return this.symTable.toString();
	}

	public String outListToString(){
		return this.out.toString();
	}

	public String toString() {
		return "Execution stack: \n" + this.exeStack + "\nSymbol table: \n" + this.symTable.toString() + "\nOutput list: \n" + this.out.toString();
	}

}