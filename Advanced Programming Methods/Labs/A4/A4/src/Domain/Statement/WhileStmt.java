package Domain.Statement;

import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Domain.Expression.IExpression;
import Domain.ProgramState.ProgramState;
import Domain.Type.BoolType;
import Domain.Utilities.IStack;
import Domain.Value.BoolValue;
import Domain.Value.IValue;

public class WhileStmt implements IStmt {
	private final IExpression expression;
	private final IStmt statement;

	public WhileStmt(IExpression expression, IStmt statement) {
		this.expression = expression;
		this.statement = statement;
	}

	@Override
	public ProgramState execute(ProgramState state) throws StatementException, ExpressionException, ADTException {
		IValue value = expression.eval(state.getSymTable(), state.getHeap());
		IStack<IStmt> stack = state.getExeStack();
		if (!value.getType().equals(new BoolType()))
			throw new StatementException(String.format("%s is not of BoolType", value));
		BoolValue boolValue = (BoolValue) value;
		if (boolValue.getValue()) {
			stack.push(this);
			stack.push(statement);
		}
		return state;
	}

	@Override
	public String toString() {
		return String.format("while(%s){%s}", expression, statement);
	}
}