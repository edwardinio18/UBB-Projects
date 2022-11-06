package Domain.Expression;

import Domain.Type.BoolType;
import Domain.Utilities.IDictionary;
import Domain.Value.BoolValue;
import Domain.Value.IValue;
import Exceptions.ADTException;
import Exceptions.ExpressionException;

import java.util.Objects;

public class LogicExp implements IExpression {
	IExpression e1;
	IExpression e2;
	String op;

	public LogicExp(String op, IExpression e1, IExpression e2) {
		this.op = op;
		this.e1 = e1;
		this.e2 = e2;
	}

	public IValue eval(IDictionary<String, IValue> symTbl) throws ExpressionException, ADTException {
		IValue v1, v2;
		v1 = this.e1.eval(symTbl);
		if (v1.getType().equals(new BoolType())) {
			v2 = this.e2.eval(symTbl);
			if (v2.getType().equals(new BoolType())) {
				BoolValue bool1 = (BoolValue)v1;
				BoolValue bool2 = (BoolValue)v2;
				boolean b1, b2;
				b1 = bool1.getValue();
				b2 = bool2.getValue();
				if (Objects.equals(this.op, "and")) {
					return new BoolValue(b1 && b2);
				} else if (Objects.equals(this.op, "or")) {
					return new BoolValue(b1 || b2);
				}
			} else {
				throw new ExpressionException("Second operand is not a boolean");
			}
		} else {
			throw new ExpressionException("First operand is not a boolean");
		}
		return null;
	}

	@Override
	public IExpression deepCopy() {
		return new LogicExp(this.op, e1.deepCopy(), e2.deepCopy());
	}

	@Override
	public String toString(){
		return this.e1.toString() + " " + this.op + " " + this.e2.toString();
	}
}