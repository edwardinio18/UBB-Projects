package Domain.Value;

import Domain.Type.IType;
import Domain.Type.StringType;

// Class for the string value
public class StringValue implements IValue {
	private final String value;

	public StringValue(String value) {
		this.value = value;
	}

	public String getValue() {
		return this.value;
	}

	@Override
	public String toString() {
		return "\"" + this.value + "\"";
	}

	@Override
	public boolean equals(Object another) {
		if (another instanceof StringValue anotherStringValue) {
			return this.value.equals(anotherStringValue.value);
		}

		return false;
	}

	@Override
	public IType getType() {
		return new StringType();
	}
}