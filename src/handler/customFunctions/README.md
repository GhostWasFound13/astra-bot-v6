# custom functionst list
$search[type;query;format?;list? = 5] for example $search[youtube;Hello;{title} by {artist} ({duration});5]

$transcript[channel?;loggingChannel?]

$setDescription[1;noob]

$download[https://cdn.discordapp.com/icons/773352845738115102/a_fa8ffe5e43202d2974e8484548d4662c.gif;./aoijs.gif]

$toToggleCase[This Is useless fr]
This will result in tHIS iS uSELESS fR

$randomWord[Hi:Hello:Bye:Sayonara;2]

$lockThread[threadID]
$unlockThread[threadID]
$renameThread[threadID;newName]


# filename functions
$fileNames[misc;separator (optional)]
#Example

Code:

```
$fileNames[utility; | ]

Return:

file1 | file2 | file3
```
# country functions
$country[Country;Format]

# Info
# Format:
{name_en}: Country name in English.
{name_es}: Country name in Spanish.
{continent_en}: Country's continent in English.
{continent_es}: Country's continent in Spanish.
{capital_en}: Country's capital in English.
{capital_es}: Country's capital in Spanish.
{dial_code}: Country's dialing code.
{code_2}: Country's two-letter country code.
{code_3}: Country's three-letter country code.
{tld}: Country's top-level domain (TLD).
{km2}: Country's area in square kilometers.
{flag}: Country's flag in emoji format (:flag_xx:, where xx is the lowercase country code).
{image}: URL of a high-resolution image of the country's flag.
