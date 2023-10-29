import pytest
import pathlib

from pluto._internal.adapters.expense_service import ExpenseServiceImpl, InvalidRow

from tests._internal.mocks import DatabaseMock, ConfigMock

tests_fixtures = pathlib.Path(__file__).parent.parent.parent / "fixtures"

class TestExpenseService:

    @pytest.fixture
    def expense_service(self):
        return ExpenseServiceImpl(DatabaseMock(ConfigMock.parse()))

    def test_raises_invalid_num_cols(self, expense_service):
        invalid_num_cols_file = pathlib.Path(tests_fixtures / "expense1.csv")
        user_id = '1'
        with pytest.raises(InvalidRow) as e:
            expense_service.add_expense_from_file(invalid_num_cols_file, user_id)
    
    def test_raises_empty_first_col(self, expense_service):
        invalid_num_cols_file = pathlib.Path(tests_fixtures / "expense2.csv")
        user_id = '1'
        with pytest.raises(ValueError) as e:
            expense_service.add_expense_from_file(invalid_num_cols_file, user_id)
    
    def test_raises_wrong_type_for_amount(self, expense_service):
        invalid_num_cols_file = pathlib.Path(tests_fixtures / "expense3.csv")
        user_id = '1'
        with pytest.raises(TypeError) as e:
            expense_service.add_expense_from_file(invalid_num_cols_file, user_id)
    
    def test_dont_raise_for_valid_entries(self, expense_service):
        valid_file = pathlib.Path(tests_fixtures / "expense4.csv")
        user_id = '1'
        try:
            expense_service.add_expense_from_file(valid_file, user_id)
        except Exception as e:
            assert False, f"valid expense file raised an exception {e}"

    def test_raises_for_negative_amount(self, expense_service):
        negative_amount_file = pathlib.Path(tests_fixtures / "expense_negative_amount.csv")
        user_id = '1'
        with pytest.raises(TypeError) as e:
            expense_service.add_expense_from_file(negative_amount_file, user_id)

    def test_raises_for_missing_user_id(self, expense_service):
        valid_file = pathlib.Path(tests_fixtures / "expense4.csv")
        user_id = None
        with pytest.raises(ValueError) as e:
            expense_service.add_expense_from_file(valid_file, "")

    def test_raises_for_invalid_file_path(self, expense_service):
        invalid_file_path = pathlib.Path(tests_fixtures / "nonexistent.csv")
        user_id = '1'
        with pytest.raises(FileNotFoundError) as e:
            expense_service.add_expense_from_file(invalid_file_path, user_id)

    def test_raises_for_empty_file(self, expense_service):
        empty_file = pathlib.Path(tests_fixtures / "expense_empty.csv")
        user_id = '1'
        with pytest.raises(ValueError) as e:
            expense_service.add_expense_from_file(empty_file, user_id)

    def test_add_expense_with_valid_data(self, expense_service):
        valid_file = pathlib.Path(tests_fixtures / "expense4.csv")
        user_id = '1'
        result = expense_service.add_expense_from_file(valid_file, user_id)
        assert result == 'Despesa adicionada com sucesso!'