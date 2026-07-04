using Avalonia.Platform;
using System;
using System.IO;
using System.Text.Json;

namespace src_avalonia
{
    public static class DataLoader
    {
        public static T? LoadAsset<T>(string path)
        {
            try
            {
                // In Avalonia, assets are resolved using the Assembly name (src-avalonia)
                var uri = new Uri($"avares://src-avalonia/{path}");
                using (var stream = AssetLoader.Open(uri))
                using (var reader = new StreamReader(stream))
                {
                    string json = reader.ReadToEnd();
                    return JsonSerializer.Deserialize<T>(json);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error loading asset {path}: {ex.Message}");
                return default;
            }
        }
    }
}
