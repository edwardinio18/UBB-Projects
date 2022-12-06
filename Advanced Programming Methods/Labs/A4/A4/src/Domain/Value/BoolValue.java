package Domain.Value;

import Domain.Type.BoolType;
import Domain.Type.IType;

public class BoolValue implements IValue {
	private final boolean value;

	public BoolValue(boolean value) {
		this.value = value;
	}

	@Override
	public IType getType() {
		return new BoolType();
	}

	@Override
	public boolean equals(Object anotherValue) {
		if (!(anotherValue instanceof BoolValue))
			return false;
		BoolValue castValue = (BoolValue) anotherValue;
		return this.value == castValue.value;
	}

	@Override
	public IValue deepCopy() {
		return new BoolValue(value);
	}

	public boolean getValue() {
		return this.value;
	}

	@Override
	public String toString() {
		return this.value ? "true" : "false";
	}
}