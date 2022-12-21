operation = await tp.system.suggester(
  ['Add Frontmatter', 'Edit Frontmatter', 'Remove Frontmatter'],
  [0, 1, 2],
  true,
  'Operation'
);

file = app.workspace.getActiveFile();
frontmatter = app.metadataCache.getFileCache(file).frontmatter;

switch (operation) {
  case 0:
    key = await tp.system.prompt('Key Name:');
    value = await tp.system.prompt('Value:');

    await app.fileManager.processFrontMatter(file, (frontmatter) => {
      frontmatter[key] = value;
    });
    break;

  case 1:
    chosenKey = await tp.system.suggester(
      Object.keys(frontmatter),
      Object.keys(frontmatter),
      true,
      'Frontmatter to Edit'
    );

    newValue = await tp.system.prompt('Updated Value:');

    await app.fileManager.processFrontMatter(file, (frontmatter) => {
      frontmatter[chosenKey] = newValue;
    });
    break;

  case 2:
    chosenKey = await tp.system.suggester(
      Object.keys(frontmatter),
      Object.keys(frontmatter),
      true,
      'Frontmatter to Remove'
    );

    await app.fileManager.processFrontMatter(file, (frontmatter) => {
      delete frontmatter[chosenKey];
    });
    break;
}
