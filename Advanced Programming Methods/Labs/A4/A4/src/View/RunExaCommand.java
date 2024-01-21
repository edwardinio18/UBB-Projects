package View;

import Controller.Controller;
import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;

import java.io.IOException;
import java.util.Objects;
import java.util.Scanner;

public class RunExaCommand extends Command {
	private final Controller controller;

	public RunExaCommand(String key, String description, Controller controller) {
		super(key, description);
		this.controller = controller;
	}

	@Override
	public void execute() {
		try {
			System.out.println("Do you want to display the steps?[Y/n]");
			Scanner readOption = new Scanner(System.in);
			String option = readOption.next();
			controller.setDisplayFlag(Objects.equals(option, "Y"));
			controller.allSteps();
			System.out.println(controller.getRepository().getCurrentState().getOut().toString());
		} catch (ExpressionException | ADTException | StatementException | IOException exception) {
			System.out.println("\u001B[31m" + exception.getMessage() + "\u001B[0m");
		}
	}
}