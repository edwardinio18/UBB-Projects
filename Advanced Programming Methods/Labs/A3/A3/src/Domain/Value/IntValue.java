package Domain.Value;

import Domain.Type.IntType;

import Domain.Type.IType;

// Class for the int value
public class IntValue implements IValue {
	private final int val;

	public IntValue(int v) {
		this.val = v;
	}

	public int getVal() {
		return this.val;
	}

	@Override
	public String toString() {
		return String.format("%d", this.val);
	}

	@Override
	public boolean equals(IValue another) {
		if (another instanceof IntValue anotherInt) {
			return this.val == anotherInt.getVal();
		}

		return false;
	}

	@Override
	public IType getType() {
		return new IntType();
	}
}