import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, beforeEach, expect, vi } from "vitest";

import CreateTaskForm from "../createTaskForm";
import { createTask } from "../../api/api";

vi.mock("../../api/api", () => ({
  createTask: vi.fn(),
}));

describe("CreateTaskForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders empty form by default", () => {
    render(<CreateTaskForm />);

    expect(screen.getByLabelText(/Title \*/i)).toHaveValue("");
    expect(
      screen.getByLabelText(/Description \(optional\)/i)
    ).toHaveValue("");
    expect(screen.getByLabelText(/Status \*/i)).toHaveValue("pending");
    expect(screen.getByLabelText(/Due date \*/i)).toHaveValue("");
  });

  it("pre-fills form when initialData is provided", () => {
    const initialData = {
      title: "Existing task",
      description: "Some description",
      status: "in_progress",
      due_at: "2025-12-31",
    };

    render(<CreateTaskForm initialData={initialData} />);

    expect(screen.getByLabelText(/Title \*/i)).toHaveValue("Existing task");
    expect(
      screen.getByLabelText(/Description \(optional\)/i)
    ).toHaveValue("Some description");
    expect(screen.getByLabelText(/Status \*/i)).toHaveValue("in_progress");
    expect(screen.getByLabelText(/Due date \*/i)).toHaveValue("2025-12-31");
  });

  it("submits form, calls createTask and onSuccess, then resets form", async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();

    createTask.mockResolvedValueOnce({ data: { id: 1 } });

    render(<CreateTaskForm onSuccess={onSuccess} />);

    const titleInput = screen.getByLabelText(/Title \*/i);
    const descriptionInput = screen.getByLabelText(
      /Description \(optional\)/i
    );
    const statusSelect = screen.getByLabelText(/Status \*/i);
    const dueDateInput = screen.getByLabelText(/Due date \*/i);
    const submitButton = screen.getByRole("button", { name: /create task/i });

    await user.type(titleInput, "My new task");
    await user.type(descriptionInput, "Test description");
    await user.selectOptions(statusSelect, "in_progress");
    await user.type(dueDateInput, "2025-12-25");

    await user.click(submitButton);

    expect(createTask).toHaveBeenCalledWith({
      title: "My new task",
      description: "Test description",
      status: "in_progress",
      due_at: "2025-12-25",
    });

    expect(
      await screen.findByText("Task My new task was created successfully.")
    ).toBeInTheDocument();

    expect(onSuccess).toHaveBeenCalled();


    expect(titleInput).toHaveValue("");
    expect(descriptionInput).toHaveValue("");
    expect(statusSelect).toHaveValue("pending");
    expect(dueDateInput).toHaveValue("");
  });

  it("shows error message when createTask throws", async () => {
    const user = userEvent.setup();

    createTask.mockRejectedValueOnce(new Error("Network error"));

    render(<CreateTaskForm />);

    const titleInput = screen.getByLabelText(/Title \*/i);
    const dueDateInput = screen.getByLabelText(/Due date \*/i);
    const submitButton = screen.getByRole("button", { name: /create task/i });

    await user.type(titleInput, "Failing task");
    await user.type(dueDateInput, "2025-12-25");
    await user.click(submitButton);

    expect(
      await screen.findByText(/Failed to create task\. Please try again\./i)
    ).toBeInTheDocument();

    expect(
      screen.queryByText(/was created successfully\./i)
    ).not.toBeInTheDocument();
  });
});
