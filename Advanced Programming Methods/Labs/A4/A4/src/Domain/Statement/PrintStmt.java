package Domain.Statement;

import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Domain.Expression.IExpression;
import Domain.ProgramState.ProgramState;
import Domain.Utilities.IList;
import Domain.Value.IValue;

public class PrintStmt implements IStmt {
	IExpression expression;

	public PrintStmt(IExpression expression) {
		this.expression = expression;
	}

	@Override
	public ProgramState execute(ProgramState state) throws ExpressionException, ADTException {
		IList<IValue> out = state.getOut();
		out.add(expression.eval(state.getSymTable(), state.getHeap()));
		state.setOut(out);
		return state;
	}

	@Override
	public String toString() {
		return String.format("Print(%s)", expression.toString());
	}
}