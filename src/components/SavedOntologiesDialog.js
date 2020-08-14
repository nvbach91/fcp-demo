import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Typography from '@material-ui/core/Typography';
import { withMainContext } from '../context/MainContext';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import { Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  section: {
    margin: theme.spacing(1),
  },
}));

const SavedOntologiesDialog = withMainContext(({ context, setSelectedVocabPrefix }) => {
  const classes = useStyles();
  return (
    <Dialog fullWidth={true} maxWidth="md" open={context.isSavedOntologiesDialogOpen} onClose={() => context.setIsSavedOntologiesDialogOpen(false)}>
      <DialogTitle>Saved ontologies</DialogTitle>
      <DialogContent>
        <Card className={classes.section}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={3}><Typography variant="h6">FCP Score</Typography></Grid>
              <Grid item xs={9}><Typography variant="h6">Ontology</Typography></Grid>
            </Grid>
          </CardContent>
        </Card>
        {Object.keys(context.savedOntologies).sort((prefix1, prefix2) => {
          const o1 = context.savedOntologies[prefix1].fcpScore;
          const o2 = context.savedOntologies[prefix2].fcpScore;
          return o1 > o2 ? -1 : o1 < o2 ? 1 : 0;
        }).map((prefix) => {
          const { vocabData, fcpScore, vocabDownloadUrl } = context.savedOntologies[prefix];
          return (
            <Card key={prefix} className={classes.section}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Typography variant="h5">{fcpScore}</Typography>
                    <IconButton color="primary" onClick={() => setSelectedVocabPrefix(prefix)} title={'Show FCP calculation'}>
                      <VisibilityIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={9}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="h5">{vocabData.titles.filter((t) => t.lang === 'en')[0].value}</Typography>
                      <Button color="primary" variant="contained" target="_blank" href={vocabDownloadUrl} endIcon={<CloudDownloadIcon />}>Download RDF</Button>
                    </div>
                    <Typography variant="body2"><Link target="_blank" href={vocabData.uri}>{vocabData.uri}</Link></Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => context.setIsSavedOntologiesDialogOpen(false)} color="secondary">Close</Button>
      </DialogActions>
    </Dialog>
  );
});

export default SavedOntologiesDialog;
