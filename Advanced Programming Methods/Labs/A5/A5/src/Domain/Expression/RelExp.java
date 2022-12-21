package Domain.Expression;

import Exceptions.ExpressionException;
import Exceptions.ADTException;
import Domain.Type.IntType;
import Domain.Utilities.IDictionary;
import Domain.Utilities.IHeap;
import Domain.Value.BoolValue;
import Domain.Value.IntValue;
import Domain.Value.IValue;

import java.util.Objects;

// Class that represents the relational expression
public class RelExp implements IExpression {
	IExpression exp1;
	IExpression exp2;
	String op;

	public RelExp(String op, IExpression exp1, IExpression exp2) {
		this.exp1 = exp1;
		this.exp2 = exp2;
		this.op = op;
	}

	@Override
	public IValue eval(IDictionary<String, IValue> tbl, IHeap heap) throws ADTException, ExpressionException {
		IValue v1, v2;
		v1 = this.exp1.eval(tbl, heap);

		if (v1.getType().equals(new IntType())) {
			v2 = this.exp2.eval(tbl, heap);

			if (v2.getType().equals(new IntType())) {
				IntValue i1 = (IntValue) v1;
				IntValue i2 = (IntValue) v2;
				int n1, n2;
				n1 = i1.getVal();
				n2 = i2.getVal();

				if (Objects.equals(this.op, "<"))
					return new BoolValue(n1 < n2);
				else if (Objects.equals(this.op, "<="))
					return new BoolValue(n1 <= n2);
				else if (Objects.equals(this.op, "=="))
					return new BoolValue(n1 == n2);
				else if (Objects.equals(this.op, "!="))
					return new BoolValue(n1 != n2);
				else if (Objects.equals(this.op, ">="))
					return new BoolValue(n1 >= n2);
				else if (Objects.equals(this.op, ">"))
					return new BoolValue(n1 > n2);
			} else
				throw new ExpressionException("Second operand is not an integer.");
		}
		else
			throw new ExpressionException("First operand is not an integer.");

		return null;
	}

	@Override
	public String toString() {
		return exp1.toString() + " " + op + " " + exp2.toString();
	}
}