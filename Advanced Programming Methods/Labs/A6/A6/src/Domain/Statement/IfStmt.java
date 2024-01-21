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
			if (boolResult.getVal()) {
				statement = thenStatement;
			} else {
				statement = elseStatement;
			}

			IStack<IStmt> stack = state.getExeStack();
			stack.push(statement);
			state.setExeStack(stack);
			return null;
		} else {
			throw new StatementException("Please provide a boolean expression in an if statement.");
		}
	}

	@Override
	public IDictionary<String, IType> typeCheck(IDictionary<String, IType> typeEnv) throws StatementException, ExpressionException, ADTException {
		IType typeExpr = expression.typeCheck(typeEnv);
		if (typeExpr.equals(new BoolType())) {
			thenStatement.typeCheck(typeEnv.deepCopy());
			elseStatement.typeCheck(typeEnv.deepCopy());
			return typeEnv;
		} else
			throw new StatementException("The condition of IF does not have the type Bool.");
	}

	@Override
	public IStmt deepCopy() {
		return new IfStmt(expression.deepCopy(), thenStatement.deepCopy(), elseStatement.deepCopy());
	}

	@Override
	public String toString() {
		return String.format("if(%s){%s}else{%s}", expression.toString(), thenStatement.toString(), elseStatement.toString());
	}
}