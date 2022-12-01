package View;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.Scanner;
import java.util.Objects;

import Exceptions.*;
import Controller.Controller;
import Domain.Expression.ArithExp;
import Domain.Expression.ValueExp;
import Domain.Expression.VarExp;
import Domain.ProgramState.ProgramState;
import Domain.Statement.*;
import Domain.Type.BoolType;
import Domain.Type.IntType;
import Domain.Utilities.*;
import Domain.Value.BoolValue;
import Domain.Value.IntValue;
import Domain.Value.IValue;
import Repository.IRepository;
import Repository.Repository;

// Class for the user interface
public class View {
	public void start() {
		boolean done = false;
		while (!done) {
			try {
				printMenu();
				Scanner readOption = new Scanner(System.in);
				int option = readOption.nextInt();
				if (option == 0) {
					done = true;
				} else if (option == 1) {
					runProgram1();
				} else if (option == 2) {
					runProgram2();
				} else if (option == 3) {
					runProgram3();
				} else {
					System.out.println("Invalid input!");
				}
			} catch (Exception exception) {
				System.out.println(exception.getMessage());
			}
		}
	}

	private void runStatement(IStmt statement) throws ExpressionException, ADTException, StatementException, IOException {
		// create the program state
		IStack<IStmt> executionStack = new MyStack<>();
		IDictionary<String, IValue> symbolTable = new MyDictionary<>();
		IList<IValue> output = new MyList<>();
		IDictionary<String, BufferedReader> fileTable = new MyDictionary<>();

		ProgramState state = new ProgramState(executionStack, symbolTable, output, fileTable, statement);

		IRepository repository = new Repository(state, "log.txt");
		Controller controller = new Controller(repository);

		System.out.println("Do you want to display the steps?[Y/n]");
		Scanner readOption = new Scanner(System.in);
		String option = readOption.next();
		controller.setDisplayFlag(Objects.equals(option, "Y"));

		controller.allSteps();
		System.out.println("Result is " + state.getOut().toString().replace('[', ' ').replace(']', ' '));
	}

	private void runProgram1() throws ADTException, ExpressionException, StatementException, IOException {
		IStmt ex1 = new CompStmt(new VarDeclStmt("v", new IntType()),
				new CompStmt(new AssignStmt("v", new ValueExp(new IntValue(2))),
						new PrintStmt(new VarExp("v"))));
		runStatement(ex1);
	}

	private void runProgram2() throws ADTException, ExpressionException, StatementException, IOException {
		IStmt ex2 = new CompStmt(new VarDeclStmt("a", new IntType()),
				new CompStmt(new VarDeclStmt("b", new IntType()),
						new CompStmt(new AssignStmt("a", new ArithExp('+', new ValueExp(new IntValue(2)), new
								ArithExp('*', new ValueExp(new IntValue(3)), new ValueExp(new IntValue(5))))),
								new CompStmt(new AssignStmt("b", new ArithExp('+', new VarExp("a"), new ValueExp(new
										IntValue(1)))), new PrintStmt(new VarExp("b"))))));
		runStatement(ex2);
	}

	private void runProgram3() throws ADTException, ExpressionException, StatementException, IOException {
		IStmt ex3 = new CompStmt(new VarDeclStmt("a", new BoolType()),
				new CompStmt(new VarDeclStmt("v", new IntType()),
						new CompStmt(new AssignStmt("a", new ValueExp(new BoolValue(true))),
								new CompStmt(new IfStmt(new VarExp("a"), new AssignStmt("v", new ValueExp(new IntValue(2))),
										new AssignStmt("v", new ValueExp(new IntValue(3)))), new PrintStmt(new VarExp("v"))))));
		runStatement(ex3);
	}

	private void printMenu() {
		System.out.println("MENU: ");
		System.out.println("0. Exit.");
		System.out.println("1. Run the first program: \n\tint v;\n\tv = 2;\n\tPrint(v)");
		System.out.println("2. Run the second program: \n\tint a;\n\tint b;\n\ta = 2 + 3 * 5;\n\tb = a + 1;\n\tPrint(b)");
		System.out.println("3. Run the third program: \n\tbool a;\n\tint v;\n\ta = true;\n\t(if(a) then(v = 2) else(v = 3);\n\tPrint(v)");
		System.out.println("Choose an option: ");
	}
}