package Domain.Value;

import Domain.Type.IType;

public interface IValue {
	IType getType();
	IValue deepCopy();
}