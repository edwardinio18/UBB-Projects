package Domain.Statement;

import Domain.Expression.IExpression;
import Domain.ProgramState.ProgramState;
import Domain.Utilities.IStack;
import Domain.Value.BoolValue;
import Domain.Value.IValue;
import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;

public class IfStmt implements IStmt {
	IExpression exp;
	IStmt thenStmt;
	IStmt elseStmt;

	public IfStmt(IExpression exp, IStmt thenStmt, IStmt elseStmt) {
		this.exp = exp;
		this.thenStmt = thenStmt;
		this.elseStmt = elseStmt;
	}

	@Override
	public ProgramState execute(ProgramState state) throws StatementException, ADTException, ExpressionException {
		IValue result = this.exp.eval(state.getSymTable());

		if (result instanceof BoolValue boolRes) {
			IStmt stmt;
			stmt = boolRes.getValue() ? this.thenStmt : this.elseStmt;

			IStack<IStmt> stack = state.getExeStack();
			stack.push(stmt);
			state.setExeStack(stack);

			return state;
		} else {
			throw new StatementException("A boolean expression must be provided in the if statement");
		}
	}

	@Override
	public IStmt deepCopy() {
		return new IfStmt(this.exp.deepCopy(), this.thenStmt.deepCopy(), this.elseStmt.deepCopy());
	}

	@Override
	public String toString() {
		return String.format("if(%s){%s}else{%s}", this.exp.toString(), this.thenStmt.toString(), this.elseStmt.toString());
	}
}