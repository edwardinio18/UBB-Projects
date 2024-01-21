package Domain.Expression;

import Exceptions.ExpressionException;
import Exceptions.ADTException;

import Domain.Utilities.IDictionary;
import Domain.Utilities.IHeap;
import Domain.Value.IValue;

import Domain.Type.BoolType;
import Domain.Value.BoolValue;

import java.util.Objects;

// Class for the logic expressions
public class LogicExp implements IExpression {
	IExpression e1;
	IExpression e2;
	String op;

	public LogicExp(IExpression e1, IExpression e2, String op) {
		this.e1 = e1;
		this.e2 = e2;
		this.op = op;
	}

	@Override
	public IValue eval(IDictionary<String, IValue> tbl, IHeap heap) throws ADTException, ExpressionException {
		IValue v1, v2;
		v1 = this.e1.eval(tbl, heap);

		if (v1.getType().equals(new BoolType())) {
			v2 = this.e2.eval(tbl, heap);

			if (v2.getType().equals(new BoolType())) {
				BoolValue i1 = (BoolValue) v1;
				BoolValue i2 = (BoolValue) v2;
				boolean n1, n2;
				n1 = i1.getVal();
				n2 = i2.getVal();

				if (Objects.equals(this.op, "and"))
					return new BoolValue(n1 && n2);
				else if (Objects.equals(this.op, "or"))
					return new BoolValue(n1 || n2);
			} else
				throw new ExpressionException("Second operand is not a boolean.");
		}
		else
			throw new ExpressionException("First operand is not a boolean.");

		return null;
	}

	@Override
	public String toString() {
		return this.e1.toString() + " " + this.op + " " + this.e2.toString();
	}
}