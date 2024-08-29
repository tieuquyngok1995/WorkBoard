namespace WorkBoardServer.Common
{
    public static class ErrorMessages
    {
        public const string RequiredFieldMessage = "The {0} field is required.";
        public const string StringLengthExceeded = "The {0} field cannot exceed {1} characters.";
        public const string RangeExceeded = "The {0} must be between {1} and {2}.";
        public const string InvalidEmailAddress = "The {0} field is not a valid email address.";
    }
}
