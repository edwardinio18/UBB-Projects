package Domain.Statement;

import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Domain.Expression.IExpression;
import Domain.ProgramState.ProgramState;
import Domain.Type.BoolType;
import Domain.Type.IType;
import Domain.Utilities.IDictionary;
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
		if (!(value instanceof BoolValue))
			throw new StatementException(String.format("%s is not a BoolValue", value));
		BoolValue boolValue = (BoolValue) value;
		if (boolValue.getVal()) {
			stack.push(this.deepCopy());
			stack.push(statement);
		}
		return null;
	}

	@Override
	public IDictionary<String, IType> typeCheck(IDictionary<String, IType> typeEnv) throws StatementException, ExpressionException, ADTException {
		IType typeExpr = expression.typeCheck(typeEnv);
		if (typeExpr.equals(new BoolType())) {
			statement.typeCheck(typeEnv.deepCopy());
			return typeEnv;
		} else
			throw new StatementException("The condition of WHILE does not have the type Bool.");
	}

	@Override
	public IStmt deepCopy() {
		return new WhileStmt(expression.deepCopy(), statement.deepCopy());
	}

	@Override
	public String toString() {
		return String.format("while(%s){%s}", expression, statement);
	}
}