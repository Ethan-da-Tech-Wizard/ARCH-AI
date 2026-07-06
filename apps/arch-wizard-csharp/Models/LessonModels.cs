using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace src_avalonia.Models
{
    public class Source
    {
        [JsonPropertyName("label")]
        public string Label { get; set; } = string.Empty;

        [JsonPropertyName("url")]
        public string Url { get; set; } = string.Empty;

        [JsonPropertyName("note")]
        public string Note { get; set; } = string.Empty;
    }

    public class Block
    {
        [JsonPropertyName("type")]
        public string Type { get; set; } = string.Empty;

        [JsonPropertyName("title")]
        public string Title { get; set; } = string.Empty;

        [JsonPropertyName("text")]
        public string Text { get; set; } = string.Empty;

        [JsonPropertyName("branch")]
        public string? Branch { get; set; }
    }

    public class Command
    {
        [JsonPropertyName("label")]
        public string Label { get; set; } = string.Empty;

        [JsonPropertyName("sources")]
        public List<Source> Sources { get; set; } = new();

        [JsonPropertyName("command")]
        public string CommandText { get; set; } = string.Empty;

        [JsonPropertyName("purpose")]
        public string Purpose { get; set; } = string.Empty;

        [JsonPropertyName("words")]
        public List<List<string>> Words { get; set; } = new();

        [JsonPropertyName("expected")]
        public string Expected { get; set; } = string.Empty;

        [JsonPropertyName("fails")]
        public string Fails { get; set; } = string.Empty;

        [JsonPropertyName("branch")]
        public string? Branch { get; set; }
    }

    public class Section
    {
        [JsonPropertyName("title")]
        public string Title { get; set; } = string.Empty;

        [JsonPropertyName("summary")]
        public string Summary { get; set; } = string.Empty;

        [JsonPropertyName("sources")]
        public List<Source> Sources { get; set; } = new();

        [JsonPropertyName("blocks")]
        public List<Block> Blocks { get; set; } = new();

        [JsonPropertyName("commands")]
        public List<Command> Commands { get; set; } = new();

        [JsonPropertyName("terms")]
        public List<string> Terms { get; set; } = new();
    }

    public class LessonsDatabase
    {
        [JsonPropertyName("sections")]
        public List<Section> Sections { get; set; } = new();

        [JsonPropertyName("officialSources")]
        public Dictionary<string, Source> OfficialSources { get; set; } = new();
    }

    public class GlossaryTermDetail
    {
        [JsonPropertyName("appears")]
        public string Appears { get; set; } = string.Empty;

        [JsonPropertyName("example")]
        public string Example { get; set; } = string.Empty;

        [JsonPropertyName("safety")]
        public string Safety { get; set; } = string.Empty;
    }

    public class GlossaryDatabase
    {
        [JsonPropertyName("glossary")]
        public Dictionary<string, string> Glossary { get; set; } = new();

        [JsonPropertyName("glossaryDetails")]
        public Dictionary<string, GlossaryTermDetail> GlossaryDetails { get; set; } = new();
    }
}
