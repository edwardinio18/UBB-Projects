package Domain.Statement;

import Domain.ProgramState.ProgramState;
import Domain.Utilities.IStack;

// Class that represents a compound statement (a statement that contains two other statements)
public class CompStmt implements IStmt {
	IStmt first;
	IStmt second;

	public CompStmt(IStmt first, IStmt second) {
		this.first = first;
		this.second = second;
	}

	@Override
	public String toString() {
		return "(" + first.toString() + "; " + second.toString() + ")";
	}

	@Override
	public ProgramState execute(ProgramState state) {
		IStack<IStmt> stk = state.getExeStack();
		stk.push(second);
		stk.push(first);
		state.setExeStack(stk);
		return state;
	}
}