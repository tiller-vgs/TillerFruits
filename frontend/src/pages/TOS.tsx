import { Card, CardContent, Typography, Divider } from "@mui/material";

function TOS() {
  return (
    <Card
      sx={{
        maxWidth: "800px",
        mx: "auto",
        mt: 4,
        mb: 6,
        p: 2,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
          TillerFruits – Terms of Service
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Ved å bruke TillerFruits godtar du følgende vilkår. Disse vilkårene
          gjelder for alle elever som bruker tjenesten.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
          1. Ansvar for opplastet innhold
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Elever er fullt ansvarlige for alt de selv laster opp på nettsiden. Du skal kun
          laste opp materiale som er relevant, lovlig og i tråd med skolens
          retningslinjer.
        </Typography>

        <Typography variant="h5" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
          2. Konsekvenser ved misbruk
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Opplasting av upassende, ulovlig eller uvedkommende innhold kan føre
          til disiplinære tiltak. I alvorlige tilfeller kan dette resultere i
          utestengelse fra tjenesten eller utvisning fra skolen.
        </Typography>

        <Typography variant="h5" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
          3. Anonymitet
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Elever er anonyme for andre elever når de bruker TillerFruits.
          Lærere og administratorer har likevel tilgang til informasjon som
          identifiserer hvem som har lastet opp hva, for å sikre trygg og
          ansvarlig bruk av tjenesten.
        </Typography>

        <Typography variant="h5" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
          4. Endringer i vilkår
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          TillerFruits kan oppdatere disse vilkårene ved behov. Ved større
          endringer vil brukere bli varslet.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          Sist oppdatert: {new Date().toLocaleDateString("no-NO")}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default TOS;
