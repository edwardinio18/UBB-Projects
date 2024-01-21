package Domain.Statement.;

import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Domain.ProgramState.ProgramState;
import Domain.Type.IType;
import Domain.Utilities.IDictionary;
import Domain.Utilities.IStack;

public class CompStmt implements IStmt {
	private final IStmt firstStatement;
	private final IStmt secondStatement;

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
		return null;
	}

	@Override
	public IDictionary<String, IType> typeCheck(IDictionary<String, IType> typeEnv) throws StatementException, ExpressionException, ADTException {
		return secondStatement.typeCheck(firstStatement.typeCheck(typeEnv));
	}

	@Override
	public IStmt deepCopy() {
		return new CompStmt(firstStatement.deepCopy(), secondStatement.deepCopy());
	}

	@Override
	public String toString() {
		return String.format("(%s|%s)", firstStatement.toString(), secondStatement.toString());
	}
}