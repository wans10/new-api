package gemini

var ModelList = []string{
	// stable version
	"gemini-2.0-flash-001",
	"gemini-2.0-flash-lite-001",
	"gemini-1.5-flash",
	"gemini-1.5-flash-8b",
	"gemini-1.5-pro",
	// preview version
	"gemini-2.5-flash-preview-05-20",
	"gemini-2.5-flash-preview-05-20",
	"gemini-2.5-flash-preview-tts",
	"gemini-2.5-pro-preview-05-06",
	"gemini-2.5-pro-preview-tts",
	"gemini-2.0-flash-preview-image-generation",
	// imagen models
	"imagen-3.0-generate-002",
	// embedding models
	"gemini-embedding-exp-03-07",
	"text-embedding-004",
	"embedding-001",
}

var SafetySettingList = []string{
	"HARM_CATEGORY_HARASSMENT",
	"HARM_CATEGORY_HATE_SPEECH",
	"HARM_CATEGORY_SEXUALLY_EXPLICIT",
	"HARM_CATEGORY_DANGEROUS_CONTENT",
	"HARM_CATEGORY_CIVIC_INTEGRITY",
}

var ChannelName = "google gemini"
