package Domain.Statement;

import Domain.ProgramState.ProgramState;
import Domain.Utilities.IStack;

public class CompStmt implements IStmt {
	IStmt first;
	IStmt second;

	public CompStmt(IStmt first, IStmt second) {
		this.first = first;
		this.second = second;
	}

	@Override
	public ProgramState execute(ProgramState state) {
		IStack<IStmt> stack = state.getExeStack();
		stack.push(this.second);
		stack.push(this.first);
		state.setExeStack(stack);
		return state;
	}

	@Override
	public IStmt deepCopy() {
		return new CompStmt(this.first.deepCopy(), this.second.deepCopy());
	}

	@Override
	public String toString() {
		return String.format("(%s|%s)", this.first.toString(), this.second.toString());
	}
}