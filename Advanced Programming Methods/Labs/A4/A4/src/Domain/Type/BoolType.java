package Domain.Type;

import Domain.Value.BoolValue;
import Domain.Value.IValue;

public class BoolType implements IType {
	@Override
	public boolean equals(IType anotherType) {
		return anotherType instanceof BoolType;
	}

	@Override
	public IValue defaultValue() {
		return new BoolValue(false);
	}

	@Override
	public IType deepCopy() {
		return new BoolType();
	}

	@Override
	public String toString() {
		return "bool";
	}
}