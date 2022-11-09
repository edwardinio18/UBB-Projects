package Domain.Expression;

import Domain.Type.IntType;
import Domain.Utilities.IDictionary;
import Domain.Value.IValue;
import Domain.Value.IntValue;
import Exceptions.ADTException;
import Exceptions.ExpressionException;

public class ArithExp implements IExpression {
	IExpression e1;
	IExpression e2;
	char op;

	public ArithExp(char op, IExpression e1, IExpression e2) {
		this.op = op;
		this.e1 = e1;
		this.e2 = e2;
	}

	@Override
	public IValue eval(IDictionary<String, IValue> table) throws ExpressionException, ADTException {
		IValue v1, v2;
		v1 = e1.eval(table);

		if (v1.getType().equals(new IntType())) {
			v2 = e2.eval(table);
			if (v2.getType().equals(new IntType())) {
				IntValue i1 = (IntValue)v1;
				IntValue i2 = (IntValue)v2;

				int n1, n2;
				n1 = i1.getValue();
				n2 = i2.getValue();

				switch (op) {
					case '+':
						return new IntValue(n1 + n2);
					case '-':
						return new IntValue(n1 - n2);
					case '*':
						return new IntValue(n1 * n2);
					case '/':
						if (n2 == 0) throw new ExpressionException("Division by zero");
						return new IntValue(n1 / n2);
					default:
						break;
				}
			} else {
				throw new ExpressionException("Second operand is not an integer");
			}
		} else {
			throw new ExpressionException("First operand is not an integer");
		}
		return null;
	}

	@Override
	public IExpression deepCopy() {
		return new ArithExp(op, e1.deepCopy(), e2.deepCopy());
	}

	@Override
	public String toString(){
		return this.e1.toString() + " " + this.op + " " + this.e2.toString();
	}
}