package Domain.Statement;

import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Domain.Expression.IExpression;
import Domain.ProgramState.ProgramState;
import Domain.Utilities.IStack;
import Domain.Value.BoolValue;
import Domain.Value.IValue;

public class IfStmt implements IStmt {
	IExpression expression;
	IStmt thenStatement;
	IStmt elseStatement;

	public IfStmt(IExpression expression, IStmt thenStatement, IStmt elseStatement) {
		this.expression = expression;
		this.thenStatement = thenStatement;
		this.elseStatement = elseStatement;
	}

	@Override
	public ProgramState execute(ProgramState state) throws StatementException, ExpressionException, ADTException {
		IValue result = this.expression.eval(state.getSymTable(), state.getHeap());
		if (result instanceof BoolValue boolResult) {
			IStmt statement;
			if (boolResult.getValue()) {
				statement = thenStatement;
			} else {
				statement = elseStatement;
			}

			IStack<IStmt> stack = state.getExeStack();
			stack.push(statement);
			state.setExeStack(stack);
			return state;
		} else {
			throw new StatementException("Please provide a boolean expression in an if statement.");
		}
	}

	@Override
	public String toString() {
		return String.format("if(%s){%s}else{%s}", expression.toString(), thenStatement.toString(), elseStatement.toString());
	}
}