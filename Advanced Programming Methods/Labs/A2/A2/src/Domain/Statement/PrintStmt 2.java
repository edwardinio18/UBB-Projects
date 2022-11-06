package Domain.Statement;

import Domain.Expression.IExpression;
import Domain.ProgramState.ProgramState;
import Domain.Utilities.IList;
import Domain.Value.IValue;
import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;

public class PrintStmt implements IStmt {
	IExpression exp;

	public PrintStmt(IExpression exp) {
		this.exp = exp;
	}

	@Override
	public ProgramState execute(ProgramState state) throws StatementException, ADTException, ExpressionException {
		IList<IValue> out = state.getOut();
		out.add(this.exp.eval(state.getSymTable()));
		state.setOut(out);
		return state;
	}

	@Override
	public IStmt deepCopy() {
		return new PrintStmt(this.exp.deepCopy());
	}

	@Override
	public String toString() {
		return String.format("Print(%s)", this.exp.toString());
	}
}