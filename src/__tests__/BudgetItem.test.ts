import { render } from "@testing-library/svelte";
import BudgetItem from "../components/BudgetItem.svelte";

test("it renders the budget item correctly", () => {
  const { getByText } = render(BudgetItem, {
    item: { name: "Groceries", amount: 150 },
  });
  expect(getByText("Groceries")).toBeInTheDocument();
  expect(getByText("$150.00")).toBeInTheDocument();
});
