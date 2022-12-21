package Domain.Statement;

import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Exceptions.ADTException;

import Domain.ProgramState.ProgramState;

import Domain.Expression.IExpression;
import Domain.Utilities.IStack;
import Domain.Value.IValue;

import Domain.Type.BoolType;
import Domain.Value.BoolValue;

// Class for the If Statement
public class IfStmt implements IStmt {
	IExpression exp;
	IStmt thenS;
	IStmt elseS;

	public IfStmt(IExpression e, IStmt t, IStmt el) {
		this.exp = e;
		this.thenS = t;
		this.elseS = el;
	}

	@Override
	public String toString() {
		return "(if(" + exp.toString() + ") then(" + thenS.toString() + ") else(" + elseS.toString() + "))";
	}

	@Override
	public ProgramState execute(ProgramState state) throws StatementException, ExpressionException, ADTException {
		IValue res = this.exp.eval(state.getSymTable(), state.getHeap());

		if (res.getType().equals(new BoolType())) {
			BoolValue boolRes = (BoolValue) res;
			IStmt toExecute;

			if (boolRes.getVal())
				toExecute = thenS;
			else
				toExecute = elseS;

			IStack<IStmt> stack = state.getExeStack();
			stack.push(toExecute);
			state.setExeStack(stack);

			return state;
		} else
			throw new StatementException("The condition of if has not the type bool");
	}
}