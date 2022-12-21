package Repository;

import Exceptions.ADTException;
import Domain.ProgramState.ProgramState;

import java.io.IOException;
import java.util.List;

// Interface for the repository
public interface IRepository {
	List<ProgramState> getProgramList();
	List<ProgramState> getProgramStates();
	void setProgramStates(List<ProgramState> programStates);
	void addProgram(ProgramState programState);
	void logPrgStaExe(ProgramState programState) throws ADTException, IOException;
	void emptyLogFile() throws IOException;
}