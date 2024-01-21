package Domain.Type;

import Domain.Value.BoolValue;
import Domain.Value.IValue;

// Class for the boolean Type
public class BoolType implements IType {

	@Override
	public boolean equals(IType another) {
		if (another instanceof BoolType)
			return true;

		return false;
	}

	@Override
	public String toString() {
		return "boolean";
	}

	@Override
	public IValue defaultValue() {
		return new BoolValue(false);
	}
}