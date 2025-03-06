package hr.blitz.padel.domain.enumeration;

import lombok.Getter;

@Getter
public enum CroatianCounty {
    ZAGREBACKA("Zagrebačka"),
    KRAPINSKO_ZAGORSKA("Krapinsko-zagorska"),
    SISACKO_MOSLAVACKA("Sisačko-moslavačka"),
    KARLOVACKA("Karlovačka"),
    VARAZDINSKA("Varaždinska"),
    KOPRIVNICKO_KRIZEVACKA("Koprivničko-križevačka"),
    BJELOVARSKO_BILOGORSKA("Bjelovarsko-bilogorska"),
    PRIMORSKO_GORANSKA("Primorsko-goranska"),
    LICKO_SENJSKA("Licko-senjska"),
    VIROVITICKO_PODRAVSKA("Virovitičko-podravska"),
    POZESKO_SLAVONSKA("Požeško-slavonska"),
    BRODSKO_POSAVSKA("Brodsko-posavska"),
    ZADARSKA("Zadarska"),
    OSJECKO_BARANJSKA("Osječko-baranjska"),
    SIBENSKO_KNINSKA("Šibensko-kninska"),
    VUKOVARSKO_SRIJEMSKA("Vukovarsko-srijemska"),
    SPLITSKO_DALMATINSKA("Splitsko-dalmatinska"),
    ISTARSKA("Istarska"),
    DUBROVACKO_NERETVANSKA("Dubrovacko-neretvanska"),
    MEDIMURSKA("Medimurska"),
    GRAD_ZAGREB("Grad Zagreb");

    private final String name;

    CroatianCounty(String name) {
        this.name = name;
    }
}