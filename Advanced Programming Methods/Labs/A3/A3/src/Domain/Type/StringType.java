package Domain.Type;

import Domain.Value.StringValue;
import Domain.Value.IValue;

public class StringType implements IType {

	@Override
	public boolean equals(IType another) {
		return another instanceof StringType;
	}

	@Override
	public String toString() {
		return "string";
	}

	@Override
	public IValue defaultValue() {
		return new StringValue("");
	}
}