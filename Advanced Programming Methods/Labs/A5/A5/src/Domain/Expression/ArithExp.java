package Domain.Expression;

import Exceptions.ExpressionException;
import Exceptions.ADTException;

import Domain.Type.IntType;
import Domain.Utilities.IDictionary;
import Domain.Utilities.IHeap;
import Domain.Value.IntValue;
import Domain.Value.IValue;

// Class for arithmetic expressions
public class ArithExp implements IExpression {
	IExpression e1;
	IExpression e2;
	char op;

	public ArithExp(char op, IExpression e1, IExpression e2) {
		this.e1 = e1;
		this.e2 = e2;
		this.op = op;
	}

	@Override
	public IValue eval(IDictionary<String, IValue> tbl, IHeap heap) throws ExpressionException, ADTException {
		IValue v1, v2;
		v1 = this.e1.eval(tbl, heap);

		if (v1.getType().equals(new IntType())) {
			v2 = this.e2.eval(tbl, heap);

			if (v2.getType().equals(new IntType())) {
				IntValue i1 = (IntValue) v1;
				IntValue i2 = (IntValue) v2;
				int n1, n2;
				n1 = i1.getVal();
				n2 = i2.getVal();

				if (this.op == '+')
					return new IntValue(n1 + n2);
				else if (this.op == '-')
					return new IntValue(n1 - n2);
				else if (this.op == '*')
					return new IntValue(n1 * n2);
				else if (this.op == '/')
					if (n2 == 0) throw new ExpressionException("Division by zero.");
					else return new IntValue(n1 / n2);
			} else
				throw new ExpressionException("Second operand is not an integer");
		} else
			throw new ExpressionException("First operand is not an integer.");
		return null;
	}

	@Override
	public String toString() {
		return this.e1.toString() + " " + this.op + " " + this.e2.toString();
	}
}