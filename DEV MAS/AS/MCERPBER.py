################################################################################
# Date      10/02/2022
# Author    K St-Claire
# Company   BPD Zentih Ltd
# Purpose   Change asset status to Beyond Economical Repair
# Script	MCERPBER
################################################################################

# Find all assets
allass = mbo.getMboSet("MCERPALLASS")
ass = allass.moveFirst()

while ass is not None:
    ass.setValue("STATUS","BER",2L)

    ass = allass.moveNext()

    #mbo.moveAllAssets()