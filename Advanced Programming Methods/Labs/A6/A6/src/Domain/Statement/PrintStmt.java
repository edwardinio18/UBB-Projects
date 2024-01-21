package Domain.Statement;

import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Domain.Expression.IExpression;
import Domain.ProgramState.ProgramState;
import Domain.Type.IType;
import Domain.Utilities.IDictionary;
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
		return null;
	}

	@Override
	public IDictionary<String, IType> typeCheck(IDictionary<String, IType> typeEnv) throws StatementException, ExpressionException, ADTException {
		expression.typeCheck(typeEnv);
		return typeEnv;
	}

	@Override
	public IStmt deepCopy() {
		return new PrintStmt(expression.deepCopy());
	}

	@Override
	public String toString() {
		return String.format("Print(%s)", expression.toString());
	}
}