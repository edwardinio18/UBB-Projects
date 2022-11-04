package Domain.Type;

import Domain.Value.IValue;

public interface IType {
	boolean equals(IType ant1);
	IValue defaultValue();
	IType deepCopy();
}