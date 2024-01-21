package Domain.Statement;

import Exceptions.ExpressionException;
import Exceptions.ADTException;

import Domain.ProgramState.ProgramState;

import Domain.Expression.IExpression;
import Domain.Utilities.IList;
import Domain.Value.IValue;

// Class that represents a print statement
public class PrintStmt implements IStmt {
	IExpression exp;

	public PrintStmt(IExpression exp) {
		this.exp = exp;
	}

	@Override
	public String toString() {
		return "Print(" + exp.toString() + ")";
	}

	@Override
	public ProgramState execute(ProgramState state) throws ExpressionException, ADTException {
		IList<IValue> out = state.getOut();
		out.add(exp.eval(state.getSymTable(), state.getHeap()));
		state.setOut(out);
		return state;
	}
}