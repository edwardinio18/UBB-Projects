package Domain.Type;

import Domain.Value.BoolValue;
import Domain.Value.IValue;

// Class for the boolean type
public class BoolType implements IType {

	@Override
	public boolean equals(IType another) {
		// check if two objects are the same
		return another instanceof BoolType;
	}

	@Override
	public String toString() {
		return "boolean";
	}

	@Override
	public IValue defaultValue() {
		// default value for boolean is false
		return new BoolValue(false);
	}
}