package Domain.Value;

import Domain.Type.BoolType;

import Domain.Type.IType;

// Class for the boolean value
public class BoolValue implements IValue {
	private final boolean val;

	public BoolValue(boolean v) {
		this.val = v;
	}

	public boolean getVal() {
		return this.val;
	}

	@Override
	public boolean equals(Object another) {
		if (another instanceof BoolValue anotherBool) {
			return this.val == anotherBool.getVal();
		}

		return false;
	}

	@Override
	public IType getType() {
		return new BoolType();
	}

	@Override
	public String toString() {
		return this.val ? "true" : "false";
	}
}