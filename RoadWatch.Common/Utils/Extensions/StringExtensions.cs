using System;
using System.Text.RegularExpressions;

namespace RoadWatch.Common.Utils.Extensions
{
    public static class StringExtensions
    {
        public static bool IsNullOrEmpty(this string text)
        {
            return string.IsNullOrEmpty(text);
        }

        public static string ToSentenceCase(this string item)
        {
            var sentenceRegex = new Regex(@"(^[a-z])|[?!.:,;\/](.)", RegexOptions.ExplicitCapture);
            return sentenceRegex.Replace(item.ToLower(), s => s.Value.ToUpper());
        }


        public static string ToTitleCase(this string item)
        {
            if (item == null) return null;

            string[] words = item.Split(' ');
            for (int i = 0; i < words.Length; i++)
            {
                if (words[i].Length == 0) continue;

                char firstChar = char.ToUpper(words[i][0]);
                string rest = "";
                if (words[i].Length > 1)
                {
                    rest = words[i].Substring(1).ToLower();
                }
                words[i] = firstChar + rest;
            }
            return string.Join(" ", words);
        }
    }
}
