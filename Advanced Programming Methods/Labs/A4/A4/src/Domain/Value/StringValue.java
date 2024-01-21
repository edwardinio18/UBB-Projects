package Domain.Value;

import Domain.Type.StringType;
import Domain.Type.IType;

public class StringValue implements IValue {
	private final String value;

	public StringValue(String value) {
		this.value = value;
	}

	@Override
	public IType getType() {
		return new StringType();
	}

	@Override
	public boolean equals(Object anotherValue) {
		if (!(anotherValue instanceof StringValue))
			return false;
		StringValue castValue = (StringValue) anotherValue;
		return this.value.equals(castValue.value);
	}

	@Override
	public IValue deepCopy() {
		return new StringValue(value);
	}

	public String getValue() {
		return this.value;
	}

	@Override
	public String toString() {
		return "\"" + this.value + "\"";
	}
}