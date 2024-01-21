package Domain.Statement;

import Domain.ProgramState.ProgramState;
import Domain.Utilities.IStack;

public class CompStmt implements IStmt {
	IStmt firstStatement;
	IStmt secondStatement;

	public CompStmt(IStmt firstStatement, IStmt secondStatement) {
		this.firstStatement = firstStatement;
		this.secondStatement = secondStatement;
	}

	@Override
	public ProgramState execute(ProgramState state){
		IStack<IStmt> stack = state.getExeStack();
		stack.push(secondStatement);
		stack.push(firstStatement);
		state.setExeStack(stack);
		return state;
	}

	@Override
	public String toString() {
		return String.format("(%s|%s)", firstStatement.toString(), secondStatement.toString());
	}
}